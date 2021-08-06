import {
  Form as VeeForm, Field as VeeField, defineRule, ErrorMessage,
} from 'vee-validate';
import {
  required, min, max, alpha_spaces as alphaSpaces, alpha_num as alphaNum, email, numeric, confirmed,
  max_value as maxValue,
  min_value as minValue,
} from '@vee-validate/rules';

export default {
  install(app) {
    app.component('VeeForm', VeeForm);
    app.component('VeeField', VeeField);
    app.component('ErrorMessage', ErrorMessage);
    defineRule('required', required);
    defineRule('min', min);
    defineRule('max', max);
    defineRule('alpha_spaces', alphaSpaces);
    defineRule('alhpa_num', alphaNum);
    defineRule('email', email);
    defineRule('numeric', numeric);
    defineRule('max_value', maxValue);
    defineRule('min_value', minValue);
    defineRule('confirmed', confirmed);
  },
};
