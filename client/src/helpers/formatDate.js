import moment from 'moment';
import 'moment/locale/vi';

export const formatDate = date => {
  var now = moment(new Date()); //todays date
  var end = moment(date); // another date
  var duration = moment.duration(now.diff(end));
  var days = duration.asDays();
  let day = moment(date).format('DD/MM/YYYY');
  let hour = moment(date).format('HH:mm');
  if (days > 1) {
    return `${day} lúc ${hour}`;
  } else {
    return moment(date).fromNow();
  }
};
export const showDate = date => {
  return moment(date).format('DD/MM/YYYY');
};
