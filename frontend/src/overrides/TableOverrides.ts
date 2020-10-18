import { BuilderOverrides } from "baseui/table-semantic";

export const tableBuilderOverrides: BuilderOverrides = {
    TableHeadCell: {
        style: {
            borderBottomWidth: '1px',
            '::after': {
                content: 'none'
            }
        }
    },
    TableBodyCell: {
        style: ({ $theme }) => {
            return {
                padding: $theme.sizing.scale400
            }
        }
    }
}
