let currentChapter = 1; // Bắt đầu từ chap1
        const totalChapters = 10; // Tổng số chương

        // Hàm đọc nội dung từ một tệp văn bản và hiển thị trong thẻ pre
        function readTextFile(file) {
            fetch(file)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`Error: ${response.status} - ${response.statusText}`);
                    }
                    return response.text();
                })
                .then(data => {
                    // Hiển thị nội dung trong thẻ pre
                    document.getElementById('output').textContent = data;
                })
                .catch(error => {
                    console.error('File read error:', error);
                });
        }

        // Hàm tải file dựa trên chương được chọn từ dropdown
        function loadSelectedChapter() {
            const selectedChapter = document.getElementById('chapterSelect').value;
            currentChapter = parseInt(selectedChapter);
            updateLastRead(currentChapter); // Cập nhật số chương được đọc gần đây
            loadFile();
        }

        // Hàm tải file tiếp theo hoặc trước đó
        function loadFile(direction) {
            if (direction === 'next' && currentChapter < totalChapters) {
                currentChapter++;
            } else if (direction === 'prev' && currentChapter > 1) {
                currentChapter--;
            }

            // Cập nhật giá trị của dropdown để hiển thị chương hiện tại
            document.getElementById('chapterSelect').value = currentChapter;

            // Tên file theo số chương hiện tại
            const fileName = `chap${currentChapter}.txt`;

            // Gọi hàm đọc và hiển thị nội dung
            readTextFile(fileName);
        }

        // Hàm cập nhật số chương được đọc gần đây vào tệp LastRead.txt
        function updateLastRead(chapter) {
            const lastReadFileName = 'LastRead.txt';
            const lastReadContent = chapter.toString();

            fetch(lastReadFileName, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'text/plain',
                },
                body: lastReadContent,
            })
            .catch(error => {
                console.error('Error updating LastRead.txt:', error);
            });
        }

        // Hàm đọc số chương được đọc gần đây từ tệp LastRead.txt
        function getLastReadChapter() {
            const lastReadFileName = 'LastRead.txt';

            return fetch(lastReadFileName)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`Error: ${response.status} - ${response.statusText}`);
                    }
                    return response.text();
                })
                .then(data => parseInt(data))
                .catch(error => {
                    console.error('Error reading LastRead.txt:', error);
                    return 1; // Nếu có lỗi, trả về giá trị mặc định là 1
                });
        }

        // Gọi hàm để đọc số chương được đọc gần đây và cập nhật giá trị chương hiện tại
        getLastReadChapter().then(lastReadChapter => {
            currentChapter = lastReadChapter;
            loadFile();
        });