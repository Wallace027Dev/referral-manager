export default function getStartAndEndDate(monthsAgo: number) {
  const currentDate = new Date();

  if (monthsAgo === 0) {
    // Para o filtro de "Este mês"
    return {
      startDate: new Date(currentDate.getFullYear(), currentDate.getMonth(), 1),
      endDate: new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + 1,
        0
      )
    };
  }

  if (monthsAgo === 1) {
    // Para o filtro de "Mês anterior"
    return {
      startDate: new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() - 1,
        1
      ),
      endDate: new Date(currentDate.getFullYear(), currentDate.getMonth(), 0)
    };
  }

  // Para os outros filtros
  return {
    startDate: new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() - monthsAgo,
      1
    ),
    endDate: new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() - monthsAgo + 1,
      0
    )
  };
}
