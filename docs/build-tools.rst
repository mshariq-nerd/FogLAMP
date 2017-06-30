===========
Build Tools
===========

1. Test and Coverage Report
---------------------------

* How to run Test Coverage

 - ``pip install -r requirements-test.txt``
 - ``make py-test``
 - ``make cov-report``

* How to generate Allure Report
   - Prerequisite
      + Allure command line  http://wiki.qatools.ru/display/AL/Allure+Commandline
   - ``pip install -r requirements-test.txt``
   - ``make py-test``
   - ``make test-report``
