"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = () => ({
    graphql: {
        config: {
            endpoint: '/graphql',
            shadowCRUD: true,
            playgroundAlways: true,
            defaultLimit: 10000,
            maxLimit: 100000,
        },
    },
});
