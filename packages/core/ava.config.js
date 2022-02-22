export default {
    extensions: ['ts'],
    // https://github.com/avajs/ava/issues/1973#issuecomment-629734556
    require: ['tsconfig-paths/register'],
    nodeArguments: ['-r', './esbuild-hook'],
};
