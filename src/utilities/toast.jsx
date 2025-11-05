import Swal from "sweetalert2";

const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  background: "#fff",
  color: "#333",
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});

export const showToast = (icon, title) => {
  Toast.fire({
    icon: icon, // "success" | "error" | "warning" | "info" | "question"
    title: title,
  });
};
