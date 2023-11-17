export default function initTable() {
  new DataTable("#alunos", {
    columns: [
      { orderable: true },
      { orderable: true },
      { orderable: false },
      { orderable: true },
      { orderable: true },
      { orderable: false, searchable: false },
      { orderable: false, searchable: false },
    ],
    responsive: true,
    responsive: {
      details: false,
    },
    language: {
      search: "",
      searchPlaceholder: "Busque por um aluno",
      zeroRecords: "Nenhum resultado encontrado",
      info: "Mostrando _START_ a _END_ de _TOTAL_ alunos",
      infoEmpty: "Mostrando 0 a 0 de 0 alunos",
      infoFiltered: "(filtrado de _MAX_ alunos no total)",
      paginate: {
        first: "Primeira",
        last: "Última",
        next: "Próxima",
        previous: "Anterior",
      },
    },
    lengthMenu: [5, 10, 25, 50],
    autoWidth: false,
    targets: "_all",
  });
}
