Rest Server
===========

Start rest server
-----------------

  .. code-block:: bash

      cd foglamp/rest_service/
      python -m server.py

Base URI
--------

      /foglamp

Methods
-------

GET /ping
^^^^^^^^^

 - Response:

   .. code-block:: python

      {
        "uptime": 120
      }

 - unit: seconds
 - 0 if service is down