import unittest

# Import test modules
# from test_login import UserLogin, AdminLogin
from test_ehr import UserCreateEHR
# from test_fetal import UserVisitFetal
# from test_fetal import AdminVisitFetal
# from test_pneumonia import UserVisitPneumonia
# from test_alzheimer import UserVisitAlzheimer
# from test_alzheimer import AdminVisitAlzheimer
# from test_reminder import UserCreateReminder
# from test_appointment import UserCreateAppointment

# Add more imports if you have additional test files

if __name__ == "__main__":
    test_suite = unittest.TestSuite()

    # test_suite.addTest(unittest.defaultTestLoader.loadTestsFromTestCase(UserLogin))
    # test_suite.addTest(unittest.defaultTestLoader.loadTestsFromTestCase(AdminLogin))
    test_suite.addTest(unittest.defaultTestLoader.loadTestsFromTestCase(UserCreateEHR))
    # test_suite.addTest(unittest.defaultTestLoader.loadTestsFromTestCase(UserVisitAlzheimer))
    # test_suite.addTest(unittest.defaultTestLoader.loadTestsFromTestCase(AdminVisitAlzheimer))
    # test_suite.addTest(unittest.defaultTestLoader.loadTestsFromTestCase(UserVisitFetal))
    # test_suite.addTest(unittest.defaultTestLoader.loadTestsFromTestCase(AdminVisitFetal))
    # test_suite.addTest(unittest.defaultTestLoader.loadTestsFromTestCase(UserVisitPneumonia))
    # test_suite.addTest(unittest.defaultTestLoader.loadTestsFromTestCase(UserCreateReminder))
    # test_suite.addTest(unittest.defaultTestLoader.loadTestsFromTestCase(UserCreateAppointment))

    runner = unittest.TextTestRunner()

    result = runner.run(test_suite)
    print("Total tests run:", result.testsRun)

    print("Failures:", len(result.failures))
    if result.failures:
        print("\nFailed Tests:")
        for test, traceback in result.failures:
            print(f"Test: {test}")
            print(traceback)


    print("Errors:", len(result.errors))
    if result.errors:
        print("\nTests with Errors:")
        for test, traceback in result.errors:
            print(f"Test: {test}")
            print(traceback)


    


    

