import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getCourseById } from "../services/courseService";

const CourseDetailPage = () => {
  const { id } = useParams(); // Lấy ID từ URL (ví dụ /course/1 -> id = 1)
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetail = async () => {
      const data = await getCourseById(id);
      setCourse(data);
      setLoading(false);
    };
    fetchDetail();
  }, [id]);

  if (loading) return <div className="text-center mt-5">Đang tải...</div>;
  if (!course)
    return (
      <div className="text-center mt-5 text-danger">
        Không tìm thấy khóa học!
      </div>
    );

  return (
    <div className="container mt-4">
      {/* Phần Header Khóa học */}
      <div className="row">
        <div className="col-md-8">
          <h1 className="fw-bold">{course.title}</h1>
          <p className="lead">{course.description}</p>
          <div className="d-flex align-items-center mb-3">
            <img
              src={
                course.teacher?.avatar_url || "https://via.placeholder.com/50"
              }
              alt="GV"
              className="rounded-circle me-2"
              style={{ width: "50px", height: "50px" }}
            />
            <div>
              <strong>Giảng viên: {course.teacher?.full_name}</strong>
              <div className="text-muted small">{course.teacher?.bio}</div>
            </div>
          </div>
        </div>

        {/* Phần Cột bên phải (Giá & Nút Mua) */}
        <div className="col-md-4">
          <div className="card shadow-sm">
            <img
              src={course.thumbnail_url}
              className="card-img-top"
              alt="Course"
            />
            <div className="card-body">
              <h3 className="text-primary fw-bold text-center">
                {course.price === 0 || course.price === "0.00"
                  ? "Miễn phí"
                  : parseInt(course.price).toLocaleString() + " đ"}
              </h3>
              <button className="btn btn-primary w-100 btn-lg mt-3">
                Đăng ký học ngay
              </button>
              <ul className="list-group list-group-flush mt-3">
                <li className="list-group-item">🎯 Trình độ: {course.level}</li>
                <li className="list-group-item">
                  📚 Tổng số chương: {course.chapters?.length || 0}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      {/* Phần Danh sách bài học (Curriculum) */}
      <div className="row mt-5">
        <div className="col-md-8">
          <h3 className="mb-3">Nội dung khóa học</h3>
          <div className="accordion" id="accordionChapters">
            {course.chapters &&
              course.chapters.map((chapter, index) => (
                <div className="accordion-item" key={chapter.chapter_id}>
                  <h2 className="accordion-header" id={`heading${index}`}>
                    <button
                      className="accordion-button"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target={`#collapse${index}`}
                      aria-expanded="true"
                    >
                      <strong>{chapter.title}</strong>
                    </button>
                  </h2>
                  <div
                    id={`collapse${index}`}
                    className="accordion-collapse collapse show"
                  >
                    <div className="accordion-body p-0">
                      <ul className="list-group list-group-flush">
                        {chapter.lessons &&
                          chapter.lessons.map((lesson) => (
                            <li
                              key={lesson.lesson_id}
                              className="list-group-item d-flex justify-content-between align-items-center"
                            >
                              <span>
                                <i
                                  className={`bi ${
                                    lesson.content_type === "video"
                                      ? "bi-play-circle-fill"
                                      : "bi-file-text"
                                  } me-2`}
                                ></i>
                                {lesson.title}
                              </span>
                              <span className="badge bg-secondary rounded-pill">
                                {Math.floor(lesson.duration_seconds / 60)} phút
                              </span>
                            </li>
                          ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
      <div className="mb-5"></div> {/* Khoảng trắng dưới cùng */}
    </div>
  );
};

export default CourseDetailPage;
