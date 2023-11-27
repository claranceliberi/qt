package rw.qt.userms.controllers;


import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import rw.qt.userms.models.Task;
import rw.qt.userms.models.dtos.CreateTaskDTO;
import rw.qt.userms.models.dtos.UpdateTaskDTO;
import rw.qt.userms.services.ITaskService;
import rw.qt.userms.utils.Constants;
import rw.qt.userms.exceptions.DuplicateRecordException;
import rw.qt.userms.exceptions.ResourceNotFoundException;
import rw.qt.userms.models.domains.ApiResponse;
import rw.qt.userms.models.enums.EStatus;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import java.util.List;
import java.util.UUID;


@RestController
@RequestMapping("/api/v1/tasks")
@RequiredArgsConstructor
public class TaskController extends BaseController {


    private final ITaskService taskService;



    public ResponseEntity<ApiResponse<Page<Task>>> searchAll(
            @RequestParam(value = "page", defaultValue = Constants.DEFAULT_PAGE_NUMBER) int page,
           @NotNull @RequestParam(value = "q") String query,
            @RequestParam(value = "status", required = false) EStatus status,
            @RequestParam(value = "limit", defaultValue = Constants.DEFAULT_PAGE_SIZE) int limit) throws ResourceNotFoundException {
        Pageable pageable = (Pageable) PageRequest.of(page-1, limit, Sort.Direction.DESC,"id");
        Page<Task> tasks = this.taskService.searchAll(query, status, pageable);
        return ResponseEntity.ok(
                new ApiResponse<>(tasks, localize("responses.getListSuccess"), HttpStatus.OK)
        );
    }

    @GetMapping(path="/{id}")
    public ResponseEntity<ApiResponse<Task>> getById(@Valid @PathVariable(value = "id") UUID id) throws ResourceNotFoundException {
        Task task = this.taskService.getById(id);
        return ResponseEntity.ok(new ApiResponse<>(task, localize("responses.getEntitySuccess"), HttpStatus.OK));
    }




    @PostMapping
    public ResponseEntity<ApiResponse<Task>> create(@Valid @RequestBody CreateTaskDTO dto) throws DuplicateRecordException, ResourceNotFoundException {
            Task task = this.taskService.create(dto);
            return new ResponseEntity<>(new ApiResponse<>(task, localize("responses.saveEntitySuccess"), HttpStatus.CREATED), HttpStatus.CREATED);
    }


    @PutMapping(path="/{id}")
    public ResponseEntity<ApiResponse<Task>> updateById(@PathVariable(value = "id") UUID id, @Valid @RequestBody UpdateTaskDTO dto) throws DuplicateRecordException, ResourceNotFoundException {
            Task task = this.taskService.updateById(id, dto);
            return ResponseEntity.ok(new ApiResponse<>(task, localize("responses.updateEntitySuccess"), HttpStatus.OK));
    }



    @PutMapping(value = "/{id}/status/{status}")
    public ResponseEntity<ApiResponse<Task>> changeStatus(
            @PathVariable(value = "id") UUID id,
            @PathVariable(value = "status") EStatus status) throws ResourceNotFoundException {
        Task task = this.taskService.changeStatusById(id, status);
        return ResponseEntity.ok(
                new ApiResponse<>(task, localize("responses.updateEntitySuccess"), HttpStatus.OK)
        );
    }

    @DeleteMapping(path="/{id}")
    public ResponseEntity<ApiResponse<Object>> delete(@PathVariable(value = "id") UUID id) throws ResourceNotFoundException {
        this.taskService.deleteById(id);
        return ResponseEntity.ok(new ApiResponse<>(null, localize("responses.deleteEntitySuccess"), null, HttpStatus.OK));
    }


    @Override
    protected String getEntityName() {
        return "Task";
    }
}

