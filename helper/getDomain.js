function getDomainName(url) {
    const domain = url.split('/')[2];
    return domain;
}

export default getDomainName;