import asyncio

from foglamp.device_api.coap import controller as coap_controller
from foglamp.admin_api import controller as admin_api_controller


def start():
    """Starts FogLAMP services"""
    coap_controller.start()
    admin_api_controller.start()
    asyncio.get_event_loop().run_forever()

