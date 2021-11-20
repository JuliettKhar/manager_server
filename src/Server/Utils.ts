import {parse, URL, UrlWithParsedQuery, UrlWithStringQuery} from 'url';


export class Utils {
    public static getUrlBasePath(urlStr :string | undefined): string {
        if (urlStr) {
            const url = new URL(urlStr);
            return <string>url.pathname?.split('/')[1]
        }
            return ''
    }

    public static getUrlParams(url: string | undefined): UrlWithParsedQuery | undefined {
        return <UrlWithStringQuery><unknown>url ? parse(<string>url, true) : undefined;
    }
}