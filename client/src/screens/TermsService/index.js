import React from 'react';
import {View, Text, ScrollView} from 'react-native';
import {HeaderComponent} from '../../components';
import styles from './style';
import {COLOR} from '../../assets/color';
const TermsService = ({navigation}) => {
  return (
    <View style={{backgroundColor: COLOR.WHITE, height: '100%'}}>
      <HeaderComponent title="Điều khoản sử dụng" left {...{navigation}} />
      <ScrollView style={styles.container}>
        <Text style={styles.text}>1. Mục đích và phạm vi thu thập</Text>
        <Text style={styles.textDetail}>
          Tài khoản khách hàng được tạo ra trên App RadarFood, sau lần đầu tiên
          đăng nhập vào tài khoản, khách hàng tự chịu trách nhiệm về năng lực
          hành vi trong việc thay đổi thông tin cá nhân và sử dụng RadarFood.
          Việc thu thập dữ liệu chủ yếu trên App RadarFood bao gồm: email, điện
          thoại, tên đăng nhập, mật khẩu đăng nhập, địa chỉ khách hàng. Đây là
          các thông tin mà App RadarFood cần khách hàng bắt buộc khi đăng ký sử
          dụng dịch vụ y tế và để App RadarFood liên hệ xác nhận khi khách hàng
          đăng ký sử dụng dịch vụ trên app nhằm đảm bảo quyền lợi cho cho khách
          hàng. Trong quá trình sử dụng dịch vụ y tế trên App RadarFood, chúng
          tôi lưu giữ thông tin chi tiết về thông tin tài khoản, voucher, lượt
          follow, bài viết, hình ảnh của khách hàng. Ngoài ra, khách hàng có
          trách nhiệm thông báo kịp thời về App RadarFood về những hành vi sử
          dụng trái phép, lạm dụng, vi phạm bảo mật, lưu giữ tên đăng ký và mật
          khẩu của bên thứ ba để có biện pháp giải quyết phù hợp.Chúng tôi sẽ
          bán thông tin bạn cho bên thứ 3 để có tiền nhậu và duy trì app.
        </Text>
        <Text style={styles.text}>
          2.Cam kết bảo mật thông tin cá nhân khách hàng
        </Text>
        <Text style={styles.textDetail}>
          Thông tin cá nhân của Khách hàng trên RadarFood App được RadarFood App
          cam kết bảo mật tuyệt đối theo chính sách bảo vệ thông tin cá nhân của
          RadarFood App. Việc thu thập và sử dụng thông tin của mỗi Khách hàng
          chỉ được thực hiện khi có sự đồng ý của Khách hàng đó, trừ những
          trường hợp pháp luật có quy định khác. RadarFood App cam kết: {'\n'}
          Không sử dụng, không chuyển giao, cung cấp hay tiết lộ cho bên thứ ba
          nào về thông tin cá nhân của Khách hàng khi không có sự cho phép hoặc
          đồng ý từ Khách hàng, trừ những trường hợp pháp luật có quy định khác.
          {'\n'}
          Trong trường hợp máy chủ lưu trữ thông tin bị hacker tấn công dẫn đến
          mất mát dữ liệu cá nhân Khách hàng, RadarFood App sẽ có trách nhiệm
          thông báo vụ việc cho cơ quan chức năng điều tra xử lý kịp thời và
          thông báo cho Khách hàng được biết. Bảo mật tuyệt đối mọi thông tin
          giao dịch trực tuyến của Khách hàng bao gồm thông tin hóa đơn, chứng
          từ kế toán số hóa tại khu vực dữ liệu trung tâm an toàn của RadarFood
          App.
        </Text>
        <Text style={styles.text}>
          3.Người sử dụng có thể cập nhật và thay đổi thông tin như thế nào?
        </Text>
        <Text style={styles.textDetail}>
          Khách hàng có quyền tự kiểm tra, cập nhật, điều chỉnh thông tin cá
          nhân của mình bằng cách đăng nhập vào tài khoản và chỉnh sửa thông tin
          cá nhân hoặc yêu cầu RadarFood App thực hiện việc này. Thông tin cá
          nhân của khách hàng sẽ được lưu trữ cho đến khi khách hàng có yêu cầu
          hủy bỏ hoặc khách hàng tự đăng nhập và thực hiện hủy bỏ. Trong mọi
          trường hợp thông tin cá nhân của khách hàng sẽ được bảo mật trên máy
          chủ của RadarFood App.
        </Text>
      </ScrollView>
    </View>
  );
};

export default TermsService;
