import { InputOverrides } from 'baseui/input';

export function createFormOverrides(registerFn: (args: any) => void): InputOverrides {
    return {
        Input: {
            props: {
                ref: registerFn
            }
        }
    };
};
