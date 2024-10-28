import time
import logging
from scraper import check_new_content, init_driver
from selenium.common.exceptions import WebDriverException

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

if __name__ == "__main__":
    driver = init_driver()
    try:
        while True:
            try:
                check_new_content(driver)
                time.sleep(60)

            except WebDriverException as e:
                logging.error(f"WebDriver encountered an error: {e}")
                logging.info("Attempting to reinitialize WebDriver...")
                driver.quit()
                driver = init_driver() # Reinitialize the WebDriver
                logging.info("WebDriver reinitialized successfully.")
                
    except KeyboardInterrupt:
        logging.info("Got KeyboardInterrupted")
        
    finally:
        logging.info("Closing the WebDriver")
        driver.quit()
        logging.info("WebDriver closed")
