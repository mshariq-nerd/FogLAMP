#!/usr/bin/env python3
# -*- coding: utf-8 -*-

# FOGLAMP_BEGIN
# See: http://foglamp.readthedocs.io/
# FOGLAMP_END

from aiohttp import web

from foglamp.rest_service import routes
from foglamp.rest_service import middleware


def make_app():
    # Create Server
    app = web.Application(middlewares=[middleware.error_middleware])
    routes.setup(app)
    return app

# https://aiohttp.readthedocs.io/en/stable/_modules/aiohttp/web.html#run_app
web.run_app(make_app(), host='0.0.0.0', port=8082)
