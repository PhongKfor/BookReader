let currentChapter;
const totalChapters = 11;

// Hàm khởi tạo trang
function initializePage() {
  // Gọi hàm để đọc số chương được đọc gần đây và cập nhật giá trị chương hiện tại
  if(!localStorage.getItem("chapter")) {
    localStorage.setItem("chapter",1);
  }
  currentChapter = parseInt(localStorage.getItem("chapter")); 
  updateSelectValues();
  loadFile();
}

// Hàm cập nhật giá trị của tất cả các dropdown có class "chapterSelect"
function updateSelectValues() {
  const allSelects = document.querySelectorAll(".chapterSelect");
  allSelects.forEach((select) => {
    select.value = currentChapter;
  });
}

// Hàm đọc nội dung từ một tệp văn bản và hiển thị trong thẻ pre
function readTextFile(file) {
  fetch(file)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }
      return response.text();
    })
    .then((data) => {
      // Hiển thị nội dung trong thẻ pre
      document.getElementById("output").textContent = data;
    })
    .catch((error) => {
      console.error("File read error:", error);
    });
}

// Hàm tải file dựa trên chương được chọn từ dropdown
function loadSelectedChapter(select) {
  const selectedChapter = select.value;
  currentChapter = parseInt(selectedChapter);
  updateSelectValues();
  updateLastRead(currentChapter);
  loadFile();
}

// Hàm tải file tiếp theo hoặc trước đó
function loadFile(direction) {
  if (direction === "next" && currentChapter < totalChapters) {
    currentChapter++;
  } else if (direction === "prev" && currentChapter > 1) {
    currentChapter--;
  }

  // Tên file theo số chương hiện tại
  const fileName = `chap${currentChapter}.txt`;

  // Gọi hàm đọc và hiển thị nội dung
  readTextFile(fileName);
  updateSelectValues();
  updateLastRead(currentChapter);

  // Tự động cuộn lên đầu trang
  window.scrollTo(0, 0);
}

// Hàm cập nhật số chương được đọc gần đây vào tệp LastRead.txt
function updateLastRead(chapter) {
  localStorage.setItem("chapter",chapter);
}

// Gọi hàm để khởi tạo trang
initializePage();
