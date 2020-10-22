import { BuilderOverrides } from "baseui/table-semantic";

export const tableBuilderOverrides: BuilderOverrides = {
    Root: {
        style: {
            border: '0'
        }
    },
    TableHeadCell: {
        style: ({ $theme }) => {
            const padding = $theme.sizing.scale600;
            return {
                borderRightWidth: '0px',
                borderBottomWidth: '1px',
                '::before': {
                    content: 'none'
                },
                '::after': {
                    content: 'none'
                },
                paddingTop: padding,
                paddingLeft: padding,
                paddingBottom: padding,
                paddingRight: padding,
            };
        }
    },
    TableBodyCell: {
        style: ({ $theme }) => {
            const padding = $theme.sizing.scale600;
            return {
                paddingTop: padding,
                paddingLeft: padding,
                paddingBottom: padding,
                paddingRight: padding,
                borderBottomWidth: '1px'
            }
        }
    }
}
