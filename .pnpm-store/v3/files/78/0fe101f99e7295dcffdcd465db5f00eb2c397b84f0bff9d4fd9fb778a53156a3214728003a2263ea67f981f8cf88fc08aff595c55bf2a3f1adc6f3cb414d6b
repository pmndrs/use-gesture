import { Texture } from 'three';
export declare const IsObject: (url: any) => url is Record<string, string>;
export declare function useTexture<Url extends string[] | string | Record<string, string>>(input: Url): Url extends any[] ? Texture[] : Url extends object ? {
    [key in keyof Url]: Texture;
} : Texture;
export declare namespace useTexture {
    var preload: (url: string) => undefined;
    var clear: (input: string | string[]) => any;
}
