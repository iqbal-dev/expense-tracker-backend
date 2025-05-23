import logger from './utils/logger';

const numbers = 10;

function main() {
  logger.info('Application started');
  logger.warn('This is a warning');

  return numbers;
}

main();
