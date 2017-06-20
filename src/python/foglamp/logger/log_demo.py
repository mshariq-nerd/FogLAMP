import logging
import foglamp.env as env

# logger = logging.getLogger("debug") # will log to log/debug.log

logger = logging.getLogger() # calling root

def foo():
    logger.info('Hi, foo')

class Bar(object):

    def bar(self):
        logger.info('Hi, bar')
        logger.error('Got an error?!')

if __name__ == '__main__':
    env.load_config()
    foo()
    Bar().bar()
