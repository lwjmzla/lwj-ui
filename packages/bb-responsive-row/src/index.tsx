import { defineComponent, SetupContext, PropType } from 'vue';
import  {ElRow, ElCol} from 'element-plus';
interface RowConfig {
  props?: InstanceType<typeof ElRow>;
  [key: string]: any;
}

interface ColConfig {
  props?: InstanceType<typeof ElCol> | null;
  [key: string]: any;
}

export default defineComponent({
  name: 'bb-responsive-row',
  props: {
    row: {
      type: Object as PropType<RowConfig>,
    },
    col: {
      type: Object as PropType<ColConfig>,
    },
  },
  setup(props, { slots }: SetupContext) {
    const childList = (slots.default && slots.default()) || [];

    // 处理默认参数
    const defaultColProps = { xs: 24, sm: 12, md: 8, lg: 8, xl: 6 } as unknown as InstanceType<typeof ElCol>;
    
    // @ts-ignore
    const genCol = { ...(props.col || defaultColProps) };

    return () => (
      <el-row gutter={10} { ...(props.row || {}) }>
        {
          childList.map((child) => {
            const { componentOptions }: any = child;
            if (componentOptions?.tag === 'el-col') return child;
            return (
              <el-col { ...genCol }>
                { child }
              </el-col>
            );
          })
        }
      </el-row>
    );
  },
});
