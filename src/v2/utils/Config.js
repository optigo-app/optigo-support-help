const getEnvConfig = () => {
    const host = window?.location?.hostname;

    const isDevHost =
        host.includes("localhost") ||
        host.includes("nzen") ||
        host.includes("calllog.web");

    return {
        routerBase: isDevHost ? "" : "/support",
    };
};

export const { routerBase } = getEnvConfig();
