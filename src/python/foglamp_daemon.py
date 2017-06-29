"""Runs foglamp as a daemon"""

import os
import subprocess
import argparse
import logging
import daemon
from daemon import pidfile

from foglamp.controller import start


def do_something(logf):
    """
    :param logf: log file
    """
    file_handler = logging.FileHandler(logf)
    file_handler.setLevel(logging.DEBUG)

    formatstr = '%(asctime)s - %(name)s - %(levelname)s - %(message)s'
    formatter = logging.Formatter(formatstr)

    file_handler.setFormatter(formatter)

    logger = logging.getLogger('')
    logger.addHandler(file_handler)
    logger.setLevel(logging.DEBUG)

    start()


def start_daemon(pidf, logf, wdir):
    """
    Launches the daemon

    :param pidf: pidfile
    :param logf: log file
    :param wdir: working directory
    """

    # XXX: pidfile is a context
    with daemon.DaemonContext(
        working_directory=wdir,
        umask=0o002,
        pidfile=pidfile.TimeoutPIDLockFile(pidf)
    ) as context:
        do_something(logf)


def safe_makedirs(directory):
    """
    :param directory: working directory
    """
    directory = os.path.expanduser(directory)
    try:
        os.makedirs(directory, 0o750)
    except Exception as e:
        if not os.path.exists(directory):
            raise e

def find_process_start_time(process_name):
    """
    Find Process start time

    :param process_name: name of the process
    :return: string start_time or None if no such process exists
    """
    f_ps = subprocess.Popen("ps h -C " + process_name + " -o lstart", shell=True, stdout=subprocess.PIPE)
    start_time = f_ps.stdout.read().decode("utf-8")[:-1] # remove last \n character
    f_ps.stdout.close()
    f_ps.wait()

    return start_time

def find_process_details(process_name):
    """
    Find Process details

    :param process_name: name of the process
    :return: dict of process details or None if no such process exists
    """
    f_ps = subprocess.Popen("ps h -C " + process_name + " -o comm,pid,ppid,tname,pmem,pcpu,c", shell=True,
                            stdout=subprocess.PIPE)
    output = f_ps.stdout.read().decode("utf-8")
    f_ps.stdout.close()
    f_ps.wait()

    if output == "" or output is None:
        return None

    fields = output.split()
    return dict({
        "name": fields[0],
        "start_time": find_process_start_time(process_name),
        "pid": fields[1],
        "ppid": fields[2],
        "tname": fields[3],
        "pmem": fields[4],
        "pcpu": fields[5],
        "ccpu": fields[6]
    })

def main():
    parser = argparse.ArgumentParser(description="FogLAMP daemon in Python")
    parser.add_argument('-p', '--pid-file', default='~/var/run/foglamp.pid')
    parser.add_argument('-l', '--log-file', default='~/var/log/foglamp.log')
    parser.add_argument('-w', '--working-dir', default='~/var/log')

    args = parser.parse_args()

    safe_makedirs(args.working_dir)
    safe_makedirs(os.path.dirname(args.pid_file))
    safe_makedirs(os.path.dirname(args.log_file))

    # TODO: ['start', 'stop', 'restart', 'status', 'info']
    start_daemon(pidf=os.path.expanduser(args.pid_file),
                 logf=os.path.expanduser(args.log_file),
                 wdir=os.path.expanduser(args.working_dir))


if __name__ == "__main__":
    main()
