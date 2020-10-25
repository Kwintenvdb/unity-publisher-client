import { BuilderOverrides } from 'baseui/table-semantic';

export function useTableBuilderOverrides(): BuilderOverrides {
    return {
        Root: {
            style: {
                borderLeftWidth: '0px',
                borderTopWidth: '0px',
                borderRightWidth: '0px',
                borderBottomWidth: '0px'
            }
        },
        TableHeadCell: {
            style: ({ $theme }) => {
                const padding = $theme.sizing.scale600;
                const border = $theme.borders.border300;
                return {
                    borderRightWidth: '0px',
                    borderBottomWidth: '1px',
                    borderBottomColor: border.borderColor,
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
                const border = $theme.borders.border300;
                return {
                    paddingTop: padding,
                    paddingLeft: padding,
                    paddingBottom: padding,
                    paddingRight: padding,
                    borderBottomWidth: '1px',
                    borderBottomColor: border.borderColor
                }
            }
        }
    }
}
