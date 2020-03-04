from mercury.tests.selenium_tests.selenium_base import SeleniumTestBase
from django.urls import reverse
from selenium import webdriver


class LoginTest(SeleniumTestBase):
    def setUp(self):
        self.set_test_code()
        self.wd = webdriver.Firefox()
        self.wd.implicitly_wait(10)

    def tearDown(self):
        self.wd.quit()

    def test_login(self):
        # login with testcode
        self.login_test_code()
        
        # check index page
        self.assertEqual(self.wd.title, "Mercury Telemetry")
