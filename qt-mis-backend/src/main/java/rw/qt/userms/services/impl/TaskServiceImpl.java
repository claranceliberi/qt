package rw.qt.userms.services.impl;


import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;

import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import rw.qt.userms.models.Task;

import rw.qt.userms.models.dtos.CreateTaskDTO;
import rw.qt.userms.models.dtos.UpdateTaskDTO;

import rw.qt.userms.services.ITaskService;
import rw.qt.userms.exceptions.BadRequestAlertException;
import rw.qt.userms.exceptions.DuplicateRecordException;
import rw.qt.userms.exceptions.ResourceNotFoundException;

import rw.qt.userms.models.enums.EStatus;
import rw.qt.userms.repositories.ITaskRepository;

import java.util.*;

@RequiredArgsConstructor
@Slf4j
@Service
public class TaskServiceImpl implements ITaskService {

    private final ITaskRepository taskRepository;

    @Override
    public Page<Task> searchAll(String q, EStatus status, Pageable pageable) throws ResourceNotFoundException {
        log.info("Search all Tasks by query");
       return this.taskRepository.searchAll(q,pageable);
    }


    @Override
    public Task create(CreateTaskDTO dto) throws DuplicateRecordException, ResourceNotFoundException {
        log.info("Creating Task with details " + dto.toString());

        var task  = new Task(dto);
        this.taskRepository.save(task);
        return task;

    }

    @Override
    public Task getById(UUID id) throws ResourceNotFoundException {
        log.info("Fetching Task by id '" + id.toString() + "'");
        return getTask(id);
    }


    private Task getTask(UUID id) throws ResourceNotFoundException {
        return this.taskRepository.findById(id).orElseThrow(
                () -> new ResourceNotFoundException("Task", "id", id.toString()));
    }


    @Override
    public Task updateById(UUID id, UpdateTaskDTO dto) throws ResourceNotFoundException, DuplicateRecordException {
        log.info("Updating Rank by id '" + id.toString() + "'");
        Task task = this.taskRepository.findById(id).orElseThrow(
                () -> new ResourceNotFoundException("Task", "id", id.toString())
        );

        task.setName(dto.getName());
        task.setDescription(dto.getDescription());
        task = this.taskRepository.save(task);
        return task;
    }

    @Override
    public Task changeStatusById(UUID id, EStatus status) throws ResourceNotFoundException {
        Task task = this.getById(id);

        if (status == EStatus.DELETED) { throw new  BadRequestAlertException("Status not allowed");}
        task.setStatus(status);
        task = this.taskRepository.save(task);

        return task;
    }

    @Override
    public void deleteById(UUID id) throws ResourceNotFoundException {
        log.info("Deleting Rank by id '" + id.toString() + "'");
        Task task = this.taskRepository.findById(id)  .orElseThrow(
                () -> new ResourceNotFoundException("Task", "id", id.toString())
        );

        task.setStatus(EStatus.DELETED);
        this.taskRepository.save(task);
    }

}
