import { PropType } from "vue";
export interface BBDrawerMove {
    open(): void;
    close(): void;
    getCurrentWidth(): number;
}
declare const _default: import("vue").DefineComponent<{
    size: {
        type: PropType<number>;
        default: number;
    };
    cache: {
        type: PropType<string>;
        default: string;
    };
    minSize: {
        type: PropType<number>;
        default: number;
    };
    loading: {
        type: PropType<boolean>;
        default: boolean;
    };
}, {
    visible: import("vue").Ref<boolean>;
    drawerWidth: import("vue").Ref<number>;
    initAttrs: () => {
        "show-close": boolean;
        "with-header": boolean;
    };
    getCurrentWidth: () => number;
    open: () => void;
    close: () => void;
    barMove: () => void;
    getCache: () => void;
    setCache: () => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    size?: unknown;
    cache?: unknown;
    minSize?: unknown;
    loading?: unknown;
} & {
    size: number;
    cache: string;
    minSize: number;
    loading: boolean;
} & {}>, {
    size: number;
    cache: string;
    minSize: number;
    loading: boolean;
}>;
export default _default;
