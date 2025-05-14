$(document).ready(function () {
    const baseData = [
        { id: 'RND001', department: 'RND', fullName: 'Abby Agustin', regStatus: 'Verified', empStatus: 'ACTIVE', location: 'FC' },
        { id: 'RND002', department: 'RND', fullName: 'Merlinda Binalla', regStatus: 'Verified', empStatus: 'ACTIVE', location: 'FC' },
        { id: 'RND003', department: 'RND', fullName: 'Merlinda Binalla', regStatus: 'Verified', empStatus: 'ACTIVE', location: 'FC' }
        // Add more baseData as needed
    ];

    const rowsPerPage = 50;
    let currentPage = 1;
    const dummyData = generateDummyData(5000);

    function generateDummyData(numRows) {
        const rows = [];
        for (let i = 0; i < numRows; i++) {
            const baseItem = baseData[i % baseData.length];
            const uniqueId = `RND${(i + 1).toString().padStart(3, '0')}`;
            const row = {
                ...baseItem,
                id: uniqueId
            };
            rows.push(row);
        }
        return rows;
    }

    function populateTable(data, page) {
        const tableBody = $('#employeeTableBody');
        tableBody.empty();

        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;
        const pageData = data.slice(start, end);

        pageData.forEach(employee => {
            const row = `<tr>
                <td>${employee.id}</td>
                <td>${employee.department}</td>
                <td>${employee.fullName}</td>
                <td>${employee.regStatus}</td>
                <td style="color: ${employee.empStatus === 'ACTIVE' ? 'rgb(1, 199, 1)' : 'rgb(255, 0, 0)'};">${employee.empStatus}</td>
                <td>${employee.location}</td>
            </tr>`;
            tableBody.append(row);
        });
    }

    function setupPaginationControls(totalRows) {
        const paginationControls = $('#paginationControls');
        paginationControls.empty();
        const totalPages = Math.ceil(totalRows / rowsPerPage);
        const visiblePageRange = window.innerWidth <= 480 ? 1 : 3; // 2 pages on mobile, 5 on desktop

        // "Previous" button
        const prevButton = $('<button> < </button>');
        prevButton.addClass(currentPage === 1 ? 'disabled' : '');
        prevButton.on('click', () => {
            if (currentPage > 1) {
                currentPage--;
                updateTableAndControls();
            }
        });
        paginationControls.append(prevButton);

        // Page number buttons with ellipses
        function createPageButton(pageNumber) {
            const button = $(`<button>${pageNumber}</button>`);
            if (pageNumber === currentPage) {
                button.addClass('active'); // Add 'active' class to the current page button
            }
            button.on('click', () => {
                currentPage = pageNumber;
                updateTableAndControls();
            });
            return button;
        }

        let startPage, endPage;

        if (totalPages <= visiblePageRange) {
            startPage = 1;
            endPage = totalPages;
        } else {
            const halfVisible = Math.floor(visiblePageRange / 2);
            if (currentPage <= halfVisible) {
                startPage = 1;
                endPage = visiblePageRange;
            } else if (currentPage + halfVisible >= totalPages) {
                startPage = totalPages - visiblePageRange + 1;
                endPage = totalPages;
            } else {
                startPage = currentPage - halfVisible;
                endPage = currentPage + halfVisible;
            }
        }

        if (startPage > 1) {
            paginationControls.append(createPageButton(1));
            if (startPage > 2) {
                paginationControls.append();
            }
        }

        for (let i = startPage; i <= endPage; i++) {
            paginationControls.append(createPageButton(i));
        }

        if (endPage < totalPages) {
            if (endPage < totalPages - 1) {
                paginationControls.append();
            }
            paginationControls.append(createPageButton(totalPages));
        }

        // "Next" button
        const nextButton = $('<button> > </button>');
        nextButton.addClass(currentPage === totalPages ? 'disabled' : '');
        nextButton.on('click', () => {
            if (currentPage < totalPages) {
                currentPage++;
                updateTableAndControls();
            }
        });
        paginationControls.append(nextButton);
    }

    function updateTableAndControls() {
        populateTable(dummyData, currentPage);
        setupPaginationControls(dummyData.length);
    }

    updateTableAndControls();

    $('#searchInput').on('input', function () {
        const query = $(this).val().toLowerCase();
        const totalPages = Math.ceil(dummyData.length / rowsPerPage);

        $('table tbody tr').each(function () {
            var rowText = $(this).text().toLowerCase();
            if (rowText.includes(query)) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });

        if (query) {
            const pageNumber = parseInt(query, 10);
            if (!isNaN(pageNumber) && pageNumber >= 1 && pageNumber <= totalPages) {
                currentPage = pageNumber;
                updateTableAndControls();
            } else {
                // Optionally handle invalid page number
                console.log('Invalid page number');
            }
        } else {
            // Reset to first page if search input is empty
            currentPage = 1;
            updateTableAndControls();
        }
    });

    updateTableAndControls();
});