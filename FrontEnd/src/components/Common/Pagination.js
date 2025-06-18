import React, { useState } from 'react';

function Pagination({ itemsPerPage, data, onPageChange }) {
    const [currentPage, setCurrentPage] = useState(1);

    // Tính toán trang hiện tại và tổng số trang
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data && Array.isArray(data) && data.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = data && Math.ceil(data.length / itemsPerPage);

    // Xác định danh sách trang hiển thị
    const displayPageCount = 5;
    const pages = [];

    for (let i = Math.max(1, currentPage - Math.floor(displayPageCount / 2)); i <= Math.min(totalPages, currentPage + Math.floor(displayPageCount / 2)); i++) {
        pages.push(i);
    }

    // Cập nhật trang hiện tại
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);

        if (onPageChange) {
            onPageChange(pageNumber);
        }
    };

    return (
        <div className="pagination">
            <button onClick={() => paginate(1)}>Trang đầu</button>
            <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>Trước</button>
            {pages.map((page, index) => (
                <button key={index} onClick={() => paginate(page)} className={`${currentPage === page ? 'active' : ''} `}>
                    {page}
                </button>
            ))}
            <button className="page_next" onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages}>Sau</button>
            <button onClick={() => paginate(totalPages)}>Trang cuối</button>
        </div>
    );
}

export default Pagination;
