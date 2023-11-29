import { ns } from '../src'

describe('ns-import', () => {
    it('basic support', () => {
        const scope = ns({
            namespace: 'koishi',
            prefix: 'plugin',
        })

        expect(scope.paths('foo-bar')).toEqual(['koishi-plugin-foo-bar'])
        expect(scope.paths('foo-bar/baz')).toEqual(['koishi-plugin-foo-bar/baz'])
        expect(scope.paths('koishi-plugin-foo-bar')).toEqual(['koishi-plugin-foo-bar'])
        expect(scope.paths('@qux/foo-bar')).toEqual(['@qux/koishi-plugin-foo-bar'])
        expect(scope.paths('@qux/foo-bar/baz')).toEqual(['@qux/koishi-plugin-foo-bar/baz'])
        expect(scope.paths('@qux/koishi-plugin-foo-bar')).toEqual(['@qux/koishi-plugin-foo-bar'])
    })

    it('with official scope', () => {
        const require = ns({
            namespace: 'koishi',
            prefix: 'plugin',
            official: 'koishijs',
        })

        expect(require.paths('foo-bar')).toEqual(['@koishijs/plugin-foo-bar', 'koishi-plugin-foo-bar'])
        expect(require.paths('foo-bar/baz')).toEqual(['@koishijs/plugin-foo-bar/baz', 'koishi-plugin-foo-bar/baz'])
        expect(require.paths('koishi-plugin-foo-bar')).toEqual(['koishi-plugin-foo-bar'])
        expect(require.paths('@koishijs/plugin-foo-bar')).toEqual(['@koishijs/plugin-foo-bar'])
        expect(require.paths('@qux/foo-bar')).toEqual(['@qux/koishi-plugin-foo-bar'])
        expect(require.paths('@qux/foo-bar/baz')).toEqual(['@qux/koishi-plugin-foo-bar/baz'])
        expect(require.paths('@qux/koishi-plugin-foo-bar')).toEqual(['@qux/koishi-plugin-foo-bar'])
    })
})
