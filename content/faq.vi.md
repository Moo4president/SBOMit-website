---
author: "SBOMit Maintainers"
title: "Câu hỏi thường gặp"
translationKey: "faq"
ShowToc: false
---
## SBOMit là gì?

SBOMit là tên của dự án quản lý định dạng đặc tả SBOMit. Một tài liệu SBOMit thực chất là một SBOM, chỉ có thêm thông tin xác minh được tạo ra tại thời điểm chuỗi cung ứng được thiết lập. Thông tin xác minh này, sử dụng các chứng nhận và bố cục in-toto, có thể được một bên xác thực để đạt được mức độ đảm bảo cao về phần mềm.

## Tài liệu SBOMit bao gồm những nội dung gì và tại sao?

Tài liệu SBOMit là một tài liệu đã được ký tên, bao gồm một số thành phần khác nhau.  

Trước hết, nó chứa một loạt các chứng nhận in-toto được tạo ra trong quá trình phát triển phần mềm được mô tả. Điều này bao gồm thông tin chi tiết về các bước khác nhau trong chuỗi cung ứng phần mềm, bao gồm hệ thống kiểm soát phiên bản, quy trình xây dựng, kiểm thử đơn vị, các phụ thuộc được sử dụng, kiểm thử fuzzing, kiểm tra tuân thủ giấy phép, đóng gói, v.v. Ví dụ, hệ thống xây dựng được sử dụng để biên dịch phần mềm trong SBOM có siêu dữ liệu in-toto bao gồm tên và hàm băm an toàn của các tệp được lấy từ hệ thống kiểm soát phiên bản (VCS) để biên dịch, tên và hàm băm an toàn của các tệp được tạo ra trong quá trình biên dịch, một loạt thông tin về trình biên dịch, cùng với chữ ký được tạo bởi khóa riêng do trình biên dịch nắm giữ.

Thông tin chứng thực này có thể được sử dụng kết hợp với mục thứ hai trong tài liệu SBOMit: bố cục in-toto. Bố cục in-toto được ký bởi chủ sở hữu dự án và mô tả cấu trúc của siêu dữ liệu chứng thực hợp lệ cho dự án. Bản bố cục này chỉ định các khóa riêng tư cho các bên thực hiện việc chứng thực cũng như cách các bước liên kết với nhau.  Ví dụ, hệ thống kiểm soát phiên bản (VCS) phải có một thẻ Git đã được ký, mà hệ thống xây dựng sau đó sẽ hoạt động dựa trên đó.  Các tệp được hệ thống xây dựng biên dịch phải là những tệp đã được chạy qua các bài kiểm tra đơn vị, và các bài kiểm tra này phải đã vượt qua.   Điều quan trọng là, bố cục in-toto cung cấp một chính sách có thể đọc được bằng máy, giúp xác thực các chứng nhận in-toto để đảm bảo rằng tất cả các bước đó đã được tuân thủ, theo đúng thứ tự, trên các mục đúng, và không có gì được thêm vào, bỏ qua hoặc loại bỏ.

Mục cuối cùng luôn xuất hiện trong tài liệu SBOMit là thông tin bổ sung về SBOM. Thông tin này, cùng với các chứng nhận in-toto và bố cục in-toto, có thể được sử dụng để tạo ra một SBOM thực tế dưới nhiều định dạng khác nhau.  Thông tin bổ sung về SBOM có thể bao gồm các nội dung như tên công ty hoặc các thông tin khác không được bao gồm trong quy trình in-toto nhưng cần được đưa vào bản SBOM kết quả.  Nhờ đó, bản SBOM được tạo ra từ tài liệu SBOMit có thể bao gồm các thông tin bổ sung không thuộc phạm vi của quy trình in-toto.

Ngoài ra, còn có một cách để thêm các phụ lục vào tài liệu SBOMit, nội dung này sẽ được trình bày chi tiết hơn ở phần sau.

## Tài liệu SBOMit có những ưu điểm gì so với việc sử dụng công cụ tạo SBOM quét phần mềm?

Về bản chất, các công cụ quét sẽ phân tích một phần mềm và sau đó cố gắng xác định những gì đã xảy ra trước đó. Về bản chất, chúng không hoàn hảo vì sử dụng thông tin không đầy đủ để cố gắng khôi phục lại những gì đã xảy ra trong quá khứ. Thực tiễn đã cho thấy rằng các công cụ quét khác nhau có thể đưa ra kết quả hoàn toàn khác nhau đối với cùng một phần mềm.  

Các phần xác nhận toàn diện (in-toto) trong tài liệu SBOMit được tạo ra tại thời điểm phần mềm đang được xử lý qua chuỗi cung ứng phần mềm.  Do đó, thông tin này sẽ chính xác hơn nhiều vì các xác nhận in-toto thu thập thông tin chi tiết ngay tại thời điểm sản phẩm phần mềm được sản xuất. Điều này khiến tài liệu SBOMit trở nên chính xác hơn nhiều, do bản chất của nó.

## Tài liệu SBOMit có những ưu điểm gì so với việc chỉ đơn thuần ký xác nhận SBOM?

Một SBOM đã được ký là một tuyên bố có chữ ký của người nắm giữ khóa ký tại một tổ chức, trong đó khẳng định rằng SBOM đó là chính xác. Nếu khóa ký bị đánh cắp, hoặc bên ký SBOM cung cấp thông tin không chính xác về quy trình phát triển phần mềm, thì SBOM đó sẽ không chính xác.

Một tài liệu SBOMit chứa siêu dữ liệu được ký bằng mật mã về tất cả các bước trong quá trình phát triển phần mềm và mô tả chính sách bắt buộc phải tuân thủ. Nhờ đó, các sai sót vô ý như bỏ sót một bước (vấn đề từng xảy ra trong quá khứ) hoặc các hành vi độc hại sẽ khó có thể lọt qua mà không bị phát hiện.  In-toto cũng mang lại khả năng cao hơn trong việc khôi phục an toàn sau khi hệ thống bị xâm phạm, đồng thời phát hiện và chống lại các hành vi cố ý gây hại từ một bên nào đó trong tổ chức.

Nói một cách hình ảnh, SBOM ngày nay giống như danh sách thành phần trên một sản phẩm. Tuy nhiên, trên thực tế, thông tin này thường không chính xác, có thể bị các bên có ý đồ xấu thay đổi và chưa được xác minh.   Việc ký tên vào SBOM giúp ngăn chặn việc nó bị thay đổi bởi các bên có ý đồ xấu, nhờ đó bạn có thể chắc chắn rằng danh sách thành phần mà bạn nhận được đã được một công ty cụ thể phê duyệt.  Một tài liệu SBOMit cũng mô tả chi tiết quy trình sản xuất sản phẩm và chứa siêu dữ liệu cùng chữ ký của tất cả các bên liên quan, bao gồm cả việc xác minh rằng các khóa được sử dụng là hợp lệ tại thời điểm đó.  Do đó, trong trường hợp của tài liệu SBOMit, bạn có mức độ đảm bảo cao rằng các chính sách và quy trình thích hợp đã được tuân thủ.

Để biết thêm thông tin về chủ đề này, vui lòng tham khảo bài viết [in-toto mang lại những lợi ích gì](https://in-toto.io/in-toto/) trên trang web của in-toto.

## Nếu chuỗi cung ứng phần mềm chứa các bước không an toàn thì sao?  

Các chứng nhận in-toto không thể thay thế cho việc áp dụng các biện pháp bảo mật phù hợp trong chuỗi cung ứng phần mềm. Ví dụ, nếu bạn sử dụng một quy trình xây dựng phần mềm không an toàn, chỉ đơn thuần truy cập và tải phần mềm từ một trang web, các bố cục in-toto có thể liệt kê hành động không an toàn này và xác minh các chứng nhận đã ký xác nhận rằng bạn đã thực hiện hành động không an toàn đó.  

Đó là lý do tại sao các dự án như SLSA và FRSCA được xây dựng dưới dạng một bộ quy tắc có quan điểm rõ ràng, dựa trên các bước in-toto. Chúng chỉ ra những hành động nào quan trọng hơn đối với an ninh chuỗi cung ứng phần mềm và bắt buộc phải thực hiện một số hành động nhất định.  

Các dự án này đang giải quyết những vấn đề khác nhau ở các cấp độ khác nhau. In-toto cho phép bạn thu thập thông tin về các bước thực hiện, đảm bảo các chính sách liên quan được áp dụng, quản lý tính tin cậy của khóa, v.v. Các khung công nghệ như SLSA và FRSCA sử dụng In-toto như một cơ chế để thu thập và thực thi một bộ chính sách cụ thể, từ đó giúp chuỗi cung ứng trở nên an toàn hơn.  

Hiện đang có những nỗ lực nhằm phát triển các công cụ tự động cho SLSA và FRSCA để áp dụng trên các bản thiết kế in-toto và xác minh tính tuân thủ. Khi các công cụ này đạt đến độ chín muồi, chúng có thể được tích hợp để phân tích tài liệu SBOMit và cung cấp mức điểm đánh giá phù hợp cho chuỗi cung ứng phần mềm được mô tả trong đó.   Nhờ đó, người dùng có thể cấu hình hệ thống của mình để chỉ chấp nhận phần mềm đạt mức SLSA 4 trở lên, đồng thời phải có tài liệu SBOMit hợp lệ.

## Nếu một tài liệu SBOMit cần được điều chỉnh theo thời gian thì sao? Ví dụ: khẳng định rằng tài liệu đó không chứa một lỗ hổng bảo mật nào có thể bị khai thác, bổ sung thông tin sau này mà lúc tạo tài liệu chưa cần thiết, v.v.

Một tài liệu SBOMit có thể có một loạt các phụ lục được bổ sung sau khi tài liệu đã được lập. Các phụ lục này được bổ sung sau khi tài liệu đã được lập và cuối cùng phải được ký bằng khóa chính của tài liệu SBOMit gốc. Chúng có chức năng sửa đổi các trường thông tin khác nhau trong tài liệu SBOMit hoặc bổ sung thông tin.  

Việc sử dụng các phụ lục thay vì tạo một tài liệu SBOMit mới có một ưu điểm. Bằng cách này, cả tài liệu gốc lẫn các phụ lục đều có thể được xác minh, và lịch sử của tất cả các thay đổi này đều được lưu giữ trong tài liệu SBOMit. Do đó, việc sử dụng phụ lục là phương án được khuyến nghị để xử lý các thay đổi đối với tài liệu SBOMit.

## Tôi có thể trích xuất SBOM từ một tài liệu SBOMit không?

Đúng vậy! Hiện có nhiều công cụ đang được phát triển để trích xuất SBOM từ tài liệu SBOMit. Bạn có thể nhận được các tệp SBOM ở nhiều định dạng khác nhau bằng cách sử dụng các công cụ khác nhau.
