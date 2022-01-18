import { yupToFormErrors } from 'formik';
import * as yup from 'yup';

const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email('Địa chỉ email không hợp lệ')
    .required('Vui lòng nhập thông tin'),
  password: yup
    .string()
    .required('Vui lòng nhập thông tin')
    .min(6, 'Mật khẩu phải từ 6-12 ký tự')
    .max(12, 'Mật khẩu phải từ 6-12 ký tự'),
});

const registerSchema = yup.object().shape({
  email: yup
    .string()
    .email('Địa chỉ email không hợp lệ')
    .required('Vui lòng nhập thông tin'),
  password: yup
    .string()
    .required('Vui lòng nhập thông tin')
    .min(6, 'Mật khẩu phải từ 6-12 ký tự')
    .max(12, 'Mật khẩu phải từ 6-12 ký tự'),
  passwordConfirmation: yup
    .string()
    .required('Vui lòng nhập thông tin')
    .oneOf([yup.ref('password'), null], 'Mật khẩu không khớp'),
});
const changePasswordSchema = yup.object().shape({
  password: yup
    .string()
    .required('Vui lòng nhập thông tin')
    .min(6, 'Mật khẩu phải từ 6-12 ký tự')
    .max(12, 'Mật khẩu phải từ 6-12 ký tự'),
  passwordConfirmation: yup
    .string()
    .required('Vui lòng nhập thông tin')
    .oneOf([yup.ref('password'), null], 'Mật khẩu không khớp'),
  oldPassword: yup
    .string()
    .required('Vui lòng nhập thông tin')
    .min(6, 'Mật khẩu phải từ 6-12 ký tự')
    .max(12, 'Mật khẩu phải từ 6-12 ký tự'),
});

const resetPasswordSchema = yup.object().shape({
  password: yup
    .string()
    .required('Vui lòng nhập thông tin')
    .min(6, 'Mật khẩu phải từ 6-12 ký tự')
    .max(12, 'Mật khẩu phải từ 6-12 ký tự'),
  passwordConfirmation: yup
    .string()
    .required('Vui lòng nhập thông tin')
    .oneOf([yup.ref('password'), null], 'Mật khẩu không khớp'),
});

const postsSchema = yup.object().shape({
  title: yup.string().required(),
  content: yup.string().required(),
  rating: yup.number().min(1).max(5),
});
const phoneRegExp =
  /^(0|\+84)(\s|\.)?((3[2-9])|(5[689])|(7[06-9])|(8[1-689])|(9[0-46-9]))(\d)(\s|\.)?(\d{3})(\s|\.)?(\d{3})$/;
const updateProfileSchema = yup.object().shape(
  {
    fullname: yup.string().required('Vui lòng nhập thông tin'),
    phone_number: yup
      .string()
      .notRequired()
      .nullable()
      .when('phone_number', {
        is: value => value?.length,
        then: rule => rule.matches(phoneRegExp, 'Số điện thoại không hợp lệ'),
      }),
  },
  [
    ['phone_number', 'phone_number'],
  ],
);
export {
  loginSchema,
  registerSchema,
  changePasswordSchema,
  resetPasswordSchema,
  postsSchema,
  updateProfileSchema,
};
