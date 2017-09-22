# -*- coding: utf-8 -*-

# FOGLAMP_BEGIN
# See: http://foglamp.readthedocs.io/
# FOGLAMP_END

"""Backup and Restore Rest API support"""

from aiohttp import web
# TODO: remove this and call actual class methods
from unittest.mock import MagicMock
Backup = MagicMock()

__author__ = "Vaibhav Singhal"
__copyright__ = "Copyright (c) 2017 OSIsoft, LLC"
__license__ = "Apache 2.0"
__version__ = "${VERSION}"


_help = """
    -----------------------------------------------------------------------------------
    | GET, POST       | /foglamp/backup                                                |
    | GET             | /foglamp/backup/{backup-id}                                    |
    | DELETE          | /foglamp/backup/{backup-id}                                    |
    |                                                                                  |
    | PUT             | /foglamp/backup/{backup-id}/restore                            |
    -----------------------------------------------------------------------------------
"""

async def get_backups(request):
    """
    Returns a list of all backups

    :Example: curl -X GET  http://localhost:8082/foglamp/backup
    :Example: curl -X GET  http://localhost:8082/foglamp/backup?limit=2&skip=1&status=complete
    """
    try:
        limit = request.query['limit'] if 'limit' in request.query else None
        skip = request.query['skip'] if 'skip' in request.query else None
        status = request.query['status'] if 'status' in request.query else None

        if status and status not in ['complete', 'running', 'failed']:
            return web.json_response({'error': 'Incorrect status'})

        if limit and not isinstance(limit, int):
            return web.json_response({'error': 'Limit can be a positive integer only'})

        if skip and not isinstance(skip, int):
            return web.json_response({'error': 'Skip can be a positive integer only'})

        try:
            # TODO : Fix after actual implementation
            Backup.get_backup_list.return_value = [{'id': 28, 'date': '2017-08-30 04:05:10.382', 'status': 'running'},
                                                   {'id': 27, 'date': '2017-08-29 04:05:13.392', 'status': 'failed'},
                                                   {'id': 26, 'date': '2017-08-28 04:05:08.201', 'status': 'complete'}]

            # backup_json = [{"id": b[0], "date": b[1], "status": b[2]}
            #                for b in Backup.get_backup_list()]
            backup_json = Backup.get_backup_list()
        except Backup.DoesNotExist:
            return web.json_response({"backups": []})
        return web.json_response({"backups": backup_json})
    except Exception as ex:
        raise web.HTTPInternalServerError(reason='FogLAMP has encountered an internal error', text=str(ex))

async def create_backup(request):
    """
    Creates a backup

    :Example: curl -X POST http://localhost:8082/foglamp/backup
    """
    pass

async def get_backup_details(request):
    """
    Returns the details of a backup

    :Example: curl -X GET  http://localhost:8082/foglamp/backup/1
    """
    pass

async def delete_backup(request):
    """
    Delete a backup

    :Example: curl -X DELETE  http://localhost:8082/foglamp/backup/1
    """
    pass

async def restore_backup(request):
    """
    Restore from a backup

    :Example: curl -X PUT  http://localhost:8082/foglamp/backup/1/restore
    """
    pass
