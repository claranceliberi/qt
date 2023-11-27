package rw.qt.userms.services;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import rw.qt.userms.models.Task;
import rw.qt.userms.models.dtos.CreateTaskDTO;
import rw.qt.userms.exceptions.DuplicateRecordException;
import rw.qt.userms.exceptions.ResourceNotFoundException;
import rw.qt.userms.models.dtos.UpdateTaskDTO;
import rw.qt.userms.models.enums.EStatus;

import java.util.List;
import java.util.UUID;


public interface ITaskService {
    Page<Task> searchAll(String q, EStatus statu, Pageable pageable) throws ResourceNotFoundException;
    Task create(CreateTaskDTO dto) throws DuplicateRecordException, ResourceNotFoundException;
    Task getById(UUID id) throws ResourceNotFoundException;
    Task updateById(UUID id, UpdateTaskDTO dto) throws ResourceNotFoundException, DuplicateRecordException;

    Task changeStatusById(UUID id, EStatus status) throws ResourceNotFoundException;

    void deleteById(UUID id) throws ResourceNotFoundException;

}
