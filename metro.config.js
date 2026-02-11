const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require('nativewind/metro');

module.exports = (() => {
    const config = getDefaultConfig(__dirname);

    const { transformer, resolver } = config;

    config.transformer = {
        ...transformer,
        babelTransformerPath: require.resolve("react-native-svg-transformer"),
    };
    config.resolver = {
        ...resolver,
        assetExts: resolver.assetExts.filter((ext) => ext !== "svg"),
        sourceExts: [...resolver.sourceExts, "svg"],
    };

    console.log('Metro Config Loaded');
    console.log('Asset Exts:', config.resolver.assetExts.includes('svg') ? 'Has SVG' : 'No SVG');
    console.log('Source Exts:', config.resolver.sourceExts.includes('svg') ? 'Has SVG' : 'No SVG');

    return withNativeWind(config, { input: './global.css' });
})();
