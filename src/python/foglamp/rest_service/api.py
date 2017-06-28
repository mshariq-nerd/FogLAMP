# -*- coding: utf-8 -*-

# FOGLAMP_BEGIN
# See: http://foglamp.readthedocs.io/
# FOGLAMP_END

from aiohttp import web


async def ping(request):
    """
    :return: basic health information json payload
    {'uptime': 32892} Time in seconds since FogLAMP started
    """
    # TODO write the logic to check foglamp daemon/ service status and time since its up
    return web.json_response({'uptime': 1200})
