import {Dimensions} from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export {default as HeaderComponent} from './Header';
export {default as TextInputCustom} from './TextInput';
export {default as CommentItem} from './Comment';
export {default as Rating} from './Rating';
export {windowWidth, windowHeight};
export {default as HomeDialog} from './HomeDialog';
export {default as FormButton} from './FormButton';
export {default as LogoutDialog} from './LogoutDialog';
export {default as DialogLoading} from './DialogLoading';
export {default as SignInToContinue} from './SignInToContinue';
export {default as Countdown} from './Countdown';
