import { PropType } from 'vue';
import { ElRow, ElCol } from 'element-plus';
interface RowConfig {
    props?: InstanceType<typeof ElRow>;
    [key: string]: any;
}
interface ColConfig {
    props?: InstanceType<typeof ElCol> | null;
    [key: string]: any;
}
declare const _default: import("vue").DefineComponent<{
    row: {
        type: PropType<RowConfig>;
    };
    col: {
        type: PropType<ColConfig>;
    };
}, () => JSX.Element, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, import("vue").EmitsOptions, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    row?: unknown;
    col?: unknown;
} & {} & {
    row?: RowConfig | undefined;
    col?: ColConfig | undefined;
}>, {}>;
export default _default;
