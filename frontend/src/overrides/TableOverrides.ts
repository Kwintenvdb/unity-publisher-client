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
                paddingTop: $theme.sizing.scale400,
                paddingLeft: $theme.sizing.scale400,
                paddingBottom: $theme.sizing.scale400,
                paddingRight: $theme.sizing.scale400
            }
        }
    }
}
