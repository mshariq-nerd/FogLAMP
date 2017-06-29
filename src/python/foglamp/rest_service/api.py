# -*- coding: utf-8 -*-

# FOGLAMP_BEGIN
# See: http://foglamp.readthedocs.io/
# FOGLAMP_END

from aiohttp import web
from foglamp_daemon import find_process_start_time

async def ping(request):
    """
    :return: basic health information json payload
    {'uptime': 32892} Time in seconds since FogLAMP started
    """

    # Since foglamp can be started in foreground or as a daemon, need to check for both foglampd and foglamp
    process_started_at = find_process_start_time('foglampd') or find_process_start_time('foglamp')

    since_started = 0
    if process_started_at is not None:
        # TODO: calculate since_started = now - process_started_at
        since_started = process_started_at

    return web.json_response({'uptime': since_started})
