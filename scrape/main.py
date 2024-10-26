import time
import logging
from scraper import check_new_content, init_driver

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

if __name__ == "__main__":
    driver = init_driver()
    try:
        while True:
            check_new_content(driver)
            time.sleep(60)
    except KeyboardInterrupt:
        logging.info("Got KeyboardInterrupted")
        
    finally:
        logging.info("Closing the WebDriver")
        driver.quit()
        logging.info("WebDriver closed")
