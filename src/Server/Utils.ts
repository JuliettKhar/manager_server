import { URL } from 'url';

export class Utils {
    public static getUrlBasePath(urlStr :string | undefined): string {
        if (urlStr) {
            const url = new URL(urlStr);
            return <string>url.pathname?.split('/')[1]
        }
            return ''
    }
}