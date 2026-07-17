---
author: "SBOMit Maintainers"
title: "Câu hỏi thường gặp"
translationKey: "faq"
ShowToc: false
---
## “SBOMit” là gì?

SBOMit là tên của dự án quản lý định dạng thông số kỹ thuật “SBOMit”. Một tài liệu “SBOMit” thực chất là một “SBOM”, chỉ khác là có bổ sung thêm thông tin xác minh được tạo ra tại thời điểm xây dựng chuỗi cung ứng. Thông tin xác minh này, sử dụng các tiêu chuẩn in-toto, attestations và layouts, có thể được một bên liên quan xác thực để đạt được mức độ đảm bảo cao về phần mềm.

## Tài liệu “SBOMit” bao gồm những nội dung gì và tại sao?

Tài liệu “SBOMit” là một tài liệu đã được ký tên, bao gồm một số thành phần khác nhau.  

Trước hết, nó chứa một loạt các tệp nhật ký xây dựng (in-toto) attestations được tạo ra trong quá trình phát triển phần mềm như đã mô tả. Điều này bao gồm thông tin chi tiết về các bước khác nhau trong chuỗi cung ứng phần mềm, bao gồm hệ thống kiểm soát phiên bản, quy trình xây dựng, kiểm thử đơn vị, các phụ thuộc được sử dụng, kiểm thử fuzzing, kiểm tra tuân thủ giấy phép, đóng gói, v.v.  Ví dụ, hệ thống xây dựng được sử dụng để biên dịch phần mềm trong SBOM có in-toto metadata với tên và hàm băm an toàn của các tệp được lấy từ VCS để biên dịch, tên và hàm băm an toàn của các tệp được tạo ra trong quá trình biên dịch, một loạt thông tin về trình biên dịch, và chữ ký bằng khóa riêng do trình biên dịch nắm giữ.

Thông tin tại attestation có thể được sử dụng kết hợp với mục thứ hai trong tài liệu SBOMit: một in-toto layout.  Tài liệu in-toto layout được ký bởi chủ sở hữu dự án và mô tả các attestation metadata hợp lệ cho dự án trông như thế nào. Tài liệu "layout" quy định các khóa riêng tư cho các bên thực hiện quy trình "attestations" cũng như cách các bước này liên kết với nhau. Ví dụ, hệ thống kiểm soát phiên bản (VCS) phải có một thẻ Git đã được ký, mà hệ thống xây dựng sau đó sẽ thao tác trên đó. Các tệp được hệ thống xây dựng biên dịch phải là những tệp đã được chạy qua các bài kiểm tra đơn vị (unit tests), và các bài kiểm tra này phải đã qua.   Điều quan trọng là, Chính sách Kiểm tra Tích hợp (in-toto) layout cung cấp một chính sách có thể đọc được bởi máy tính, có thể xác thực Quy trình Xây dựng (in-toto) attestations để đảm bảo rằng tất cả các bước đó đã được thực hiện đúng thứ tự, trên các mục đúng, và không có gì được thêm vào, bỏ qua hoặc loại bỏ.

Mục cuối cùng luôn xuất hiện trong tài liệu SBOMit là thông tin bổ sung SBOM. Thông tin này cùng với in-toto attestations và in-toto layout có thể được sử dụng để tạo ra một SBOM thực tế dưới nhiều định dạng khác nhau. Thông tin bổ sung SBOM có thể bao gồm các nội dung như tên công ty hoặc các thông tin khác không được đề cập trong in-toto nhưng cần được đưa vào SBOM kết quả.  Như vậy, một tệp SBOM được tạo ra từ tài liệu SBOMit có thể bao gồm thông tin bổ sung không thuộc phần của quy trình in-toto.

Ngoài ra, còn có một cách để thêm addendums vào tài liệu SBOMit, điều này sẽ được trình bày chi tiết hơn ở phần sau.

## Tài liệu “SBOMit” có những ưu điểm gì so với việc sử dụng công cụ tạo mã “SBOM” dựa trên việc quét phần mềm?

Về bản chất, các công cụ quét sẽ phân tích một phần mềm và sau đó cố gắng xác định những gì đã xảy ra trước đó. Về bản chất, chúng không hoàn hảo vì sử dụng thông tin không đầy đủ để cố gắng khôi phục lại những gì đã xảy ra trong quá khứ. Thực tiễn đã cho thấy rằng các công cụ quét khác nhau có thể đưa ra kết quả hoàn toàn khác biệt khi phân tích cùng một phần mềm.  

Các phần in-toto attestation của tài liệu SBOMit được tạo ra tại thời điểm phần mềm được xử lý qua chuỗi cung ứng phần mềm. Do đó, thông tin này sẽ chính xác hơn rất nhiều vì in-toto attestations thu thập thông tin chi tiết ngay tại thời điểm sản phẩm phần mềm đang được phát triển. Điều này khiến tài liệu SBOMit trở nên chính xác hơn rất nhiều, do bản chất của nó.

## Những ưu điểm của văn bản “SBOMit” so với việc chỉ ký vào văn bản “SBOM” là gì?

Một tệp “SBOM” đã được ký là một tuyên bố có chữ ký của người nắm giữ khóa ký tại một tổ chức, trong đó khẳng định rằng tệp “SBOM” là chính xác. Nếu khóa bị đánh cắp, hoặc bên ký tệp “SBOM” cung cấp thông tin không chính xác về cách phần mềm được phát triển, thì tệp “SBOM” sẽ không chính xác.

Một tài liệu “SBOMit” chứa các thông tin được ký số (metadata) về tất cả các bước trong quá trình phát triển phần mềm và mô tả chính sách mà các bên liên quan phải tuân thủ.  Việc các sai sót vô ý như bỏ qua một bước (điều này trước đây từng là một vấn đề) hoặc các hành động độc hại không bị phát hiện sẽ trở nên khó khăn hơn nhiều.  in-toto cũng cung cấp khả năng cao hơn để khôi phục an toàn sau khi hệ thống bị xâm phạm, đồng thời phát hiện và chống lại các hành động độc hại từ một bên nào đó trong tổ chức.

Để lấy một ví dụ so sánh, ngày nay, “SBOM” (Tuyên bố thành phần) cũng giống như danh sách thành phần trên một sản phẩm. Tuy nhiên, trên thực tế, thông tin này thường không chính xác, có thể bị các bên có ý đồ xấu thay đổi và không được xác minh. Việc ký số vào “SBOM” (Tuyên bố thành phần được ký số) giúp ngăn chặn việc thông tin này bị các bên có ý đồ xấu thay đổi, nhờ đó bạn có thể chắc chắn rằng danh sách thành phần mà bạn nhận được đã được một công ty cụ thể phê duyệt.  Tài liệu “Bản khai báo thành phần” (SBOMit) cũng mô tả chi tiết quy trình sản xuất sản phẩm và bao gồm các thông tin xác thực (metadata) cùng chữ ký của tất cả các bên liên quan, bao gồm cả việc xác minh rằng các khóa được sử dụng là hợp lệ tại thời điểm đó. Do đó, đối với tài liệu “Bản khai báo thành phần” (SBOMit), bạn có mức độ đảm bảo cao rằng các chính sách và quy trình phù hợp đã được tuân thủ.

Để biết thêm thông tin về chủ đề này, vui lòng tham khảo bài viết [in-toto mang lại những lợi ích gì](https://in-toto.io/in-toto/) trên trang web in-toto.

## Nếu chuỗi cung ứng phần mềm chứa các bước không an toàn thì sao?  

in-toto attestations không thể thay thế cho việc áp dụng các biện pháp bảo mật phù hợp trong chuỗi cung ứng phần mềm. Ví dụ, nếu bạn sử dụng quy trình xây dựng phần mềm không an toàn, chỉ đơn thuần sử dụng lệnh curl để tải xuống và biên dịch phần mềm từ một trang web, thì in-toto và layouts có thể liệt kê hành động không an toàn này và xác minh tệp đã ký attestations, cho thấy rằng bạn đã thực hiện hành động không an toàn này.  

Đó là lý do tại sao các dự án như SLSA và FRSCA được xây dựng dưới dạng một bộ quy tắc có quan điểm rõ ràng, dựa trên các bước được nêu tại in-toto. Các dự án này chỉ ra những hành động nào quan trọng hơn đối với an ninh chuỗi cung ứng phần mềm và yêu cầu bắt buộc phải thực hiện một số hành động cụ thể.  

Các dự án này đang giải quyết những vấn đề khác nhau ở các cấp độ khác nhau.  in-toto cho phép bạn thu thập thông tin về các bước thực hiện, đảm bảo các chính sách liên quan được áp dụng, quản lý tính tin cậy của khóa, v.v.  Các khung công tác như SLSA và FRSCA sử dụng in-toto như một cơ chế để thu thập và thực thi một bộ chính sách cụ thể, từ đó giúp chuỗi cung ứng trở nên an toàn hơn.  

Hiện đang có những nỗ lực nhằm phát triển các công cụ tự động cho SLSA và FRSCA để chúng có thể hoạt động trên in-toto layouts và xác minh tính tuân thủ. Khi các công cụ này đạt đến độ chín muồi, chúng có thể được tích hợp để phân tích tài liệu SBOMit và cung cấp mức điểm đánh giá phù hợp cho chuỗi cung ứng phần mềm được mô tả trong đó. Nhờ đó, người dùng có thể cấu hình hệ thống của mình để chỉ chấp nhận phần mềm đạt mức 4 trở lên theo tiêu chuẩn SLSA, đồng thời phải có tài liệu SBOMit hợp lệ.

## Nếu một tài liệu “SBOMit” cần được điều chỉnh theo thời gian thì sao? Ví dụ: khẳng định rằng tài liệu đó không chứa một lỗ hổng bảo mật nào có thể bị khai thác, bổ sung thông tin sau này mà lúc ban đầu chưa cần thiết, v.v.

Một tài liệu SBOMit có thể chứa một loạt các bản ghi bổ sung (addendums) được thêm vào sau khi tài liệu đã được tạo. Những bản ghi này được thêm vào sau khi tài liệu đã được tạo và cuối cùng phải được ký bằng khóa chính (master key) của tài liệu gốc SBOMit. Chúng có chức năng sửa đổi các trường khác nhau trong tài liệu SBOMit hoặc bổ sung thông tin.  

Việc sử dụng addendums thay vì tạo một tài liệu mới tại SBOMit mang lại một lợi thế.  Bằng cách này, cả tài liệu gốc lẫn bất kỳ bản addendums nào cũng sẽ có thể kiểm chứng được, và lịch sử của những thay đổi này đều được lưu giữ trong tài liệu SBOMit.  Do đó, addendums là mô hình được khuyến nghị để xử lý các thay đổi đối với tài liệu SBOMit.

## Tôi có thể trích xuất tệp SBOM từ tài liệu SBOMit không?

Đúng vậy! Hiện có nhiều công cụ đang được phát triển để trích xuất tệp định dạng “SBOM” từ tài liệu “SBOMit”. Bạn có thể tải xuống tệp “SBOMs” dưới nhiều định dạng khác nhau bằng cách sử dụng các công cụ khác nhau.
