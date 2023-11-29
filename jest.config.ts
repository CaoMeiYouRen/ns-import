import { Config } from 'jest'

export default {
    preset: 'ts-jest',
    clearMocks: true,
    coverageDirectory: 'coverage',
    testEnvironment: 'node',
    moduleFileExtensions: ['ts', 'js', 'json', 'mjs', 'cjs'],
    moduleDirectories: ['node_modules', 'src'],
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
    },
    testRegex: '.test.ts$',
    transform: {
        '^.+\\.(t|j)s$': ['ts-jest', {
            tsconfig: 'tsconfig.json',
        }],
    },
} as Config
