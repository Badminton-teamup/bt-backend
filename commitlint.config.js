/**
 * Cấu hình cho Commitlint, dùng chuẩn Conventional Commits
 * Tham khảo: https://www.conventionalcommits.org/
 */
module.exports = {
  extends: ['@commitlint/config-conventional'],

  // Tuỳ chọn bổ sung (không bắt buộc):
  rules: {
    // Bắt buộc phải có type (feat, fix, chore, ...)
    'type-empty': [2, 'never'],

    // Type phải viết thường (lowercase)
    'type-case': [2, 'always', 'lower-case'],

    // Không để trống phần subject (nội dung)
    'subject-empty': [2, 'never'],

    // Không viết hoa chữ cái đầu subject
    'subject-case': [2, 'never', ['sentence-case', 'start-case', 'pascal-case', 'upper-case']],

    // Cho phép hoặc không cho phép scope rỗng
    'scope-empty': [1, 'never'],

    // Không được có dấu chấm ở cuối subject
    'subject-full-stop': [2, 'never', '.'],
  },
};
