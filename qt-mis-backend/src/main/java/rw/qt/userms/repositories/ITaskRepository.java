package rw.qt.userms.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import rw.qt.userms.models.Task;

import java.util.UUID;

@Repository
public interface ITaskRepository extends JpaRepository<Task, UUID> {

    @Query("""
            SELECT t FROM Task t WHERE (t.name ILIKE CONCAT('%', :query, '%') OR t.description ILIKE CONCAT('%', :query, '%'))  AND t.status <> 'DELETED'
            """)
    Page<Task> searchAll(String query, Pageable pageable);

}
