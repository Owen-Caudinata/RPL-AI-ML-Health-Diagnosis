import os
import unittest
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from dotenv import load_dotenv
import time

load_dotenv()

USER_URL = os.getenv("USER_URL")


class UserCreateReminder(unittest.TestCase):
    def setUp(self):
        self.driver = webdriver.Chrome()

    def test_login(self):
        driver = self.driver
        driver.get(USER_URL)

        username_field = driver.find_element(By.ID, "email")
        password_field = driver.find_element(By.ID, "password")
        login_button = driver.find_element(By.XPATH, "//button[@type='submit']")

        username_field.send_keys("jamesmichael0555@gmail.com")
        password_field.send_keys("GekkoMain")

        login_button.submit()

        time.sleep(1)
        self.assertIn("Optimize Your Health ", driver.page_source)

        driver.get(USER_URL + "/reminder")
        time.sleep(1)

        self.assertIn("Add Data", driver.page_source)

        driver.get(USER_URL + "/reminder-create")
        time.sleep(1)
        driver.get(USER_URL + "/reminder-read")
        time.sleep(1)
        driver.get(USER_URL + "/reminder-update")
        time.sleep(1)
        driver.get(USER_URL + "/reminder-delete")
        time.sleep(1)


    def tearDown(self):
        self.driver.close()
