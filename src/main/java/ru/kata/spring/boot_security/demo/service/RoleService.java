package ru.kata.spring.boot_security.demo.service;

import ru.kata.spring.boot_security.demo.model.Role;

import java.util.List;

public interface RoleService {

    Role getRoleById(long id);

    List<Role> getAllRoles();

    void saveRole(Role role);

    Role getRole(String role);
}
