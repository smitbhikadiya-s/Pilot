import { customScanner } from '@sonar/scan';

customScanner(
  {
    serverUrl: 'http://localhost:9000',
    token: 'add-your-token-here',
    options: {
      'sonar.projectKey': 'react-pilot-test',
      'sonar.projectName': 'React-Pilot-Test',
      'sonar.projectVersion': '1.0',
      'sonar.sources': 'src',
      'sonar.exclusions': '**/*.test.ts,**/*.test.tsx',
      'sonar.javascript.lcov.reportPaths': 'coverage/lcov.info',
      'sonar.typescript.enable': 'true',
      'sonar.typescript.tsconfigPath': 'tsconfig.sonar.json',
      'sonar.coverage.exclusions': '**/*.ts, **/*.tsx',
    },
  },
  () => process.exit(),
);
